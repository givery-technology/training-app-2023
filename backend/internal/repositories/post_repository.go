package repositories

import (
	"errors"
	"gorm.io/gorm"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type PostRepository struct {
	Conn *gorm.DB
}

type Post struct {
	gorm.Model
	Title  string
	Body   string
	UserId uint
}

type PostAndUser struct {
	Post Post `gorm:"embedded"`
	User User `gorm:"embedded"`
}

func applyPostSearchCondition(cond *interfaces.PostSearchCondition, query *gorm.DB) *gorm.DB {
	result := query
	if cond.Words != nil && len(*cond.Words) > 0 {
		for _, word := range *cond.Words {
			value := "%" + word + "%"
			result = result.Where("(posts.title LIKE ? OR posts.body LIKE ?)", value, value)
		}
	}
	if cond.Id != nil {
		result = result.Where("posts.id = ?", *cond.Id)
	}
	return result
}

func NewPostRepository(conn *gorm.DB) *PostRepository {
	return &PostRepository{
		Conn: conn,
	}
}

func (r *PostRepository) List(cond *interfaces.PostSearchCondition, limitOffset *entities.LimitOffset) ([]*entities.Post, error) {
	postAndUsers := []PostAndUser{}
	query := r.Conn.Table("posts").Select([]string{
		"posts.id",
		"posts.title",
		"posts.body",
		"posts.user_id",
		"posts.created_at",
		"posts.updated_at",
		"users.name",
	}).Joins("INNER JOIN users ON users.id = posts.user_id")
	if cond != nil {
		query = applyPostSearchCondition(cond, query)
	}
	if limitOffset != nil {
		query = applyLimitOffset(limitOffset, query)
	}

	result := query.Scan(&postAndUsers)
	if result.Error != nil {
		if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, result.Error
		}
	}
	results := []*entities.Post{}
	for _, v := range postAndUsers {
		results = append(results, convertPostRepositoryModelToEntity(&v))
	}
	return results, nil
}

func (r *PostRepository) Count(cond *interfaces.PostSearchCondition) (int, error) {
	var count int64
	query := r.Conn.Table("posts")
	if cond != nil {
		query = applyPostSearchCondition(cond, query)
	}
	result := query.Count(&count)
	if result.Error != nil {
		return 0, result.Error
	}
	return int(count), nil
}

func (r *PostRepository) Get(id entities.PostId) (*entities.Post, error) {
	cond := interfaces.PostSearchCondition{
		Id: &id,
	}
	result, err := r.List(&cond, nil)
	if err != nil {
		return nil, err
	}
	if len(result) == 0 {
		return nil, nil
	}
	return result[0], nil
}

func convertPostRepositoryModelToEntity(v *PostAndUser) *entities.Post {
	return &entities.Post{
		Id:        entities.PostId(v.Post.ID),
		Title:     v.Post.Title,
		Body:      v.Post.Body,
		UserId:    entities.UserId(v.Post.UserId),
		UserName:  v.User.Name,
		CreatedAt: v.Post.CreatedAt,
		UpdatedAt: v.Post.CreatedAt,
	}
}
