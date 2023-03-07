package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type HelloWorldUsecase struct {
	repository interfaces.HelloWorldRepository
}

func NewHelloWorldUsecase(r interfaces.HelloWorldRepository) *HelloWorldUsecase {
	return &HelloWorldUsecase{
		repository: r,
	}
}

func (u *HelloWorldUsecase) Execute(lang string) (*entities.HelloWorld, error) {
	return u.repository.Get(lang)
}
