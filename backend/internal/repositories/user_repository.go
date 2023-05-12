package repositories

import (
	"gorm.io/gorm"
)

type UserRepository struct {
	Conn *gorm.DB
}

type User struct {
	gorm.Model
	Name     string
	Password string
}
