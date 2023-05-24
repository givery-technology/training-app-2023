package usecases

import (
	"errors"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type DeletePostUsecase struct {
	repository interfaces.PostRepository
}

func NewDeletePostUsecase(r interfaces.PostRepository) *DeletePostUsecase {
	return &DeletePostUsecase{
		repository: r,
	}
}

func (u *DeletePostUsecase) Execute(user *entities.User, postId entities.PostId) error {
	post, err := u.repository.Get(postId, false)
	if err != nil {
		return err
	}
	if post == nil {
		return errors.New("Target post is not found")
	}
	if post.UserId != user.Id {
		return errors.New("Target post is not owned by user")
	}
	return u.repository.Delete(post)
}
