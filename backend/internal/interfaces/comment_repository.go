package interfaces

import (
	"myapp/internal/entities"
)

type CommentRepository interface {
	List(postId entities.PostId) ([]*entities.Comment, error)
	Get(commentId entities.CommentId) (*entities.Comment, error)
	Create(input *entities.CommentCreateInput) (*entities.Comment, error)
	Update(post *entities.Comment, input *entities.CommentUpdateInput) (*entities.Comment, error)
	Delete(post *entities.Comment) error
}
