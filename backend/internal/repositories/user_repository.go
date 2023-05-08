package repositories

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"myapp/internal/entities"
)

type User struct {
	gorm.Model
	Name     string
	Password string
}

type UserRepository struct {
	Conn *gorm.DB
}

func NewUserRepository(conn *gorm.DB) *UserRepository {
	return &UserRepository{
		Conn: conn,
	}
}

func (r *UserRepository) FindByIPass(username string, password string) (*entities.User, error) {
	hash, _ := bcrypt.GenerateFromPassword([]byte(password), 12)
	println(string(hash))

	var user User
	result := r.Conn.Table("users").Where(
		"name = ?",
		username,
	).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		} else {
			return nil, result.Error
		}
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, err
	}
	return convertUserRepositoryModelToEntity(&user), nil
}

func (r *UserRepository) FindById(id entities.UserId) (*entities.User, error) {
	var user User
	result := r.Conn.Table("users").First(&user, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		} else {
			return nil, result.Error
		}
	}
	return convertUserRepositoryModelToEntity(&user), nil
}

func convertUserRepositoryModelToEntity(v *User) *entities.User {
	return &entities.User{
		Id:        entities.UserId(v.ID),
		Name:      v.Name,
		CreatedAt: v.CreatedAt,
		UpdatedAt: v.UpdatedAt,
	}
}
