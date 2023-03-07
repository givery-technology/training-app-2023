package interfaces

import (
	"myapp/internal/entities"
)

type HelloWorldRepository interface {
	Get(lang string) (*entities.HelloWorld, error)
}
