package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type GetPostUsecase struct {
	repository interfaces.PostRepository
}

func NewGetPostUsecase(r interfaces.PostRepository) *GetPostUsecase {
	return &GetPostUsecase{
		repository: r,
	}
}

func (u *GetPostUsecase) Execute(id entities.PostId) (*entities.Post, error) {
	return u.repository.Get(id)
}
