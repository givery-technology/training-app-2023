package repositories

import (
	"errors"
	"fmt"
	"gorm.io/gorm"
	"myapp/internal/entities"
)

type HelloWorldRepository struct {
	Conn *gorm.DB
}

// This struct is same as entity model
// However define again for training
type HelloWorld struct {
	Lang    string
	Message string
}

func NewHelloWorldRepository(conn *gorm.DB) *HelloWorldRepository {
	return &HelloWorldRepository{
		Conn: conn,
	}
}

func (r *HelloWorldRepository) Get(lang string) (*entities.HelloWorld, error) {
	var obj HelloWorld
	result := r.Conn.Where("lang = ?", lang).First(&obj)
	fmt.Printf("%+v\n", result)
	fmt.Printf("%+v\n", obj)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return convertHelloWorldRepositoryModelToEntity(&obj), nil
}

func convertHelloWorldRepositoryModelToEntity(v *HelloWorld) *entities.HelloWorld {
	return &entities.HelloWorld{
		Lang:    v.Lang,
		Message: v.Message,
	}
}
