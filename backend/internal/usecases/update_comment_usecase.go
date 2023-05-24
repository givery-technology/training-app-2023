package usecases

import (
	"errors"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type UpdateCommentUsecase struct {
	repository interfaces.CommentRepository
}

func NewUpdateCommentUsecase(r interfaces.CommentRepository) *UpdateCommentUsecase {
	return &UpdateCommentUsecase{
		repository: r,
	}
}

func (u *UpdateCommentUsecase) Execute(user *entities.User, commentId entities.CommentId, input *entities.CommentUpdateInput) (*entities.Comment, error) {
	comment, err := u.repository.Get(commentId)
	if err != nil {
		return nil, err
	}
	if comment == nil {
		return nil, errors.New("Target comment is not found")
	}
	if comment.UserId != user.Id {
		return nil, errors.New("Target comment is not owned by user")
	}
	return u.repository.Update(comment, input)
}
