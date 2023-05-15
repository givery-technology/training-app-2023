package middleware

import (
	"fmt"
	"myapp/internal/config"
	"myapp/internal/entities"
	"myapp/internal/repositories"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

func VerifyJwt() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if isSafeRequest(ctx) {
			ctx.Next()
			return
		}
		tokenString, err := ctx.Cookie("jwt")
		if err != nil {
			ctx.JSON(401, gin.H{
				"message": "Unauthorized",
			})
			return
		}
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(config.JwtSecret), nil
		})
		if err != nil {
			ctx.JSON(401, gin.H{
				"message": err.Error(),
			})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			ctx.JSON(401, gin.H{
				"message": "Invalid token",
			})
			return
		}
		userId := entities.UserId(claims["user_id"].(float64))
		db := ctx.MustGet("db").(*gorm.DB)
		repo := repositories.NewUserRepository(db)
		user, err := repo.FindById(userId)
		if err != nil || user == nil {
			ctx.JSON(401, gin.H{
				"message": "Fail to get user",
			})
			return
		}
		ctx.Set("user", user)
		ctx.Next()
	}
}

func isSafeRequest(ctx *gin.Context) bool {
	path := ctx.Request.URL.Path
	method := ctx.Request.Method
	if method == "POST" && path == "/signin" {
		return true
	}
	if method != "GET" {
		return false
	}
	if path == "/" || path == "/posts" || path == "/basic" {
		return true
	}
	if strings.HasPrefix(path, "/posts/") {
		return true
	}
	return false
}
