package interfaces

import (
	"myapp/internal/entities"
)

type UserRepository interface {
	FindByIPass(username string, password string) (*entities.User, error)
	FindById(id entities.UserId) (*entities.User, error)
}
