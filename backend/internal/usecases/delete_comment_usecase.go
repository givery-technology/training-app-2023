package usecases

import (
	"errors"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type DeleteCommentUsecase struct {
	repository interfaces.CommentRepository
}

func NewDeleteCommentUsecase(r interfaces.CommentRepository) *DeleteCommentUsecase {
	return &DeleteCommentUsecase{
		repository: r,
	}
}

func (u *DeleteCommentUsecase) Execute(user *entities.User, commentId entities.CommentId) error {
	comment, err := u.repository.Get(commentId)
	if err != nil {
		return err
	}
	if comment == nil {
		return errors.New("Target comment is not found")
	}
	if comment.UserId != user.Id {
		return errors.New("Target comment is not owned by user")
	}
	return u.repository.Delete(comment)
}
