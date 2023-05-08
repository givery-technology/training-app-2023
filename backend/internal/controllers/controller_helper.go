package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"myapp/internal/entities"
)

type ErrorResponse struct {
	Message string "json:`message`"
}

func DB(ctx *gin.Context) *gorm.DB {
	return ctx.MustGet("db").(*gorm.DB)
}

func User(ctx *gin.Context) *entities.User {
	return ctx.MustGet("user").(*entities.User)
}

func handleError(ctx *gin.Context, status int, err error) {
	res := ErrorResponse{
		Message: err.Error(),
	}
	ctx.JSON(status, &res)
}
