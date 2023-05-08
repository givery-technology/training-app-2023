package interfaces

import (
	"myapp/internal/entities"
)

type PostSearchCondition struct {
	Words *[]string
	Id    *entities.PostId
}

type PostRepository interface {
	List(cond *PostSearchCondition, limitOffset *entities.LimitOffset) ([]*entities.Post, error)
	Count(cond *PostSearchCondition) (int, error)
	Get(id entities.PostId, includeComments bool) (*entities.Post, error)
	Create(input *entities.PostCreateInput) (*entities.Post, error)
	Update(post *entities.Post, input *entities.PostUpdateInput) (*entities.Post, error)
	Delete(post *entities.Post) error
}
