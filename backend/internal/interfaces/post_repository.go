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
	Get(id entities.PostId) (*entities.Post, error)
}
