package usecases

import (
	"errors"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type UpdatePostUsecase struct {
	repository interfaces.PostRepository
}

func NewUpdatePostUsecase(r interfaces.PostRepository) *UpdatePostUsecase {
	return &UpdatePostUsecase{
		repository: r,
	}
}

func (u *UpdatePostUsecase) Execute(user *entities.User, postId entities.PostId, input *entities.PostUpdateInput) (*entities.Post, error) {
	post, err := u.repository.Get(postId)
	if err != nil {
		return nil, err
	}
	if post == nil {
		return nil, errors.New("Target post is not found")
	}
	if post.UserId != user.Id {
		return nil, errors.New("Target post is not owned by user")
	}
	return u.repository.Update(post, input)
}
