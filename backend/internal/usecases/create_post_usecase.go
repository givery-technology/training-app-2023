package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type CreatePostUsecase struct {
	repository interfaces.PostRepository
}

func NewCreatePostUsecase(r interfaces.PostRepository) *CreatePostUsecase {
	return &CreatePostUsecase{
		repository: r,
	}
}

func (u *CreatePostUsecase) Execute(input *entities.PostCreateInput) (*entities.Post, error) {
	return u.repository.Create(input)
}
