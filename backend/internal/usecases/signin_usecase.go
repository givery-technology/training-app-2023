package usecases

import (
	"github.com/golang-jwt/jwt/v4"
	"myapp/internal/config"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
	"time"
)

type SignInResponse struct {
	User  *entities.User
	Token string
}

type SignInUsecase struct {
	repository interfaces.UserRepository
}

func NewSignInUsecase(r interfaces.UserRepository) *SignInUsecase {
	return &SignInUsecase{
		repository: r,
	}
}

func (u *SignInUsecase) Execute(username string, password string) (*SignInResponse, error) {
	user, err := u.repository.FindByIPass(username, password)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, nil
	}
	// Create JWT token
	claims := jwt.MapClaims{
		"user_id": user.Id,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte(config.JwtSecret))

	return &SignInResponse{
		User:  user,
		Token: tokenString,
	}, nil
}
