package repositories

import (
	"errors"
	"gorm.io/gorm"
	"myapp/internal/entities"
	"time"
)

type CommentRepository struct {
	Conn *gorm.DB
}

type Comment struct {
	gorm.Model
	PostId uint
	Body   string
	UserId uint
}

type CommentAndUser struct {
	Comment Comment `gorm:"embedded"`
	User    User    `gorm:"embedded"`
}

type CommentSearchCondition struct {
	PostId    *entities.PostId
	CommentId *entities.CommentId
}

func NewCommentRepository(conn *gorm.DB) *CommentRepository {
	return &CommentRepository{
		Conn: conn,
	}
}

func (r *CommentRepository) List(postId entities.PostId) ([]*entities.Comment, error) {
	return r.doList(&CommentSearchCondition{
		PostId: &postId,
	})
}

func (r *CommentRepository) Get(commentId entities.CommentId) (*entities.Comment, error) {
	result, err := r.doList(&CommentSearchCondition{
		CommentId: &commentId,
	})
	if err != nil {
		return nil, err
	}
	if len(result) == 0 {
		return nil, nil
	}
	return result[0], nil
}

func (r *CommentRepository) doList(cond *CommentSearchCondition) ([]*entities.Comment, error) {
	commentAndUsers := []CommentAndUser{}
	query := r.Conn.Table("comments").Select([]string{
		"comments.id",
		"comments.post_id",
		"comments.body",
		"comments.user_id",
		"comments.created_at",
		"comments.updated_at",
		"users.name",
	}).Joins("INNER JOIN users ON users.id = comments.user_id").
		Where("comments.deleted_at IS NULL")

	if cond.PostId != nil {
		query = query.Where("comments.post_id = ?", cond.PostId)
	}
	if cond.CommentId != nil {
		query = query.Where("comments.id = ?", cond.CommentId)
	}
	result := query.Order("comments.id").Scan(&commentAndUsers)
	if result.Error != nil {
		if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, result.Error
		}
	}
	comments := []*entities.Comment{}
	for _, v := range commentAndUsers {
		comments = append(comments, convertCommentRepositoryModelToEntity(&v))
	}
	return comments, nil
}

func (r *CommentRepository) Create(input *entities.CommentCreateInput) (*entities.Comment, error) {
	comment := Comment{
		PostId: uint(input.PostId),
		Body:   input.Body,
		UserId: uint(input.UserId),
	}
	result := r.Conn.Create(&comment)
	if result.Error != nil {
		return nil, result.Error
	}
	return r.Get(entities.CommentId(comment.ID))
}

func (r *CommentRepository) Update(comment *entities.Comment, input *entities.CommentUpdateInput) (*entities.Comment, error) {
	update := Comment{
		Model: gorm.Model{
			ID:        uint(comment.Id),
			CreatedAt: comment.CreatedAt,
			UpdatedAt: time.Now(),
		},
		PostId: uint(comment.PostId),
		Body:   input.Body,
		UserId: uint(comment.UserId),
	}
	result := r.Conn.Save(&update)
	if result.Error != nil {
		return nil, result.Error
	}
	return r.Get(comment.Id)
}

func (r *CommentRepository) Delete(comment *entities.Comment) error {
	delete := Comment{
		Model: gorm.Model{ID: uint(comment.Id)},
	}
	result := r.Conn.Delete(&delete)
	return result.Error
}

func convertCommentRepositoryModelToEntity(v *CommentAndUser) *entities.Comment {
	return &entities.Comment{
		Id:        entities.CommentId(v.Comment.ID),
		PostId:    entities.PostId(v.Comment.PostId),
		Body:      v.Comment.Body,
		UserId:    entities.UserId(v.Comment.UserId),
		UserName:  v.User.Name,
		CreatedAt: v.Comment.CreatedAt,
		UpdatedAt: v.Comment.CreatedAt,
	}
}
