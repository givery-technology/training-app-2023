package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"myapp/internal/repositories"
	"myapp/internal/usecases"
)

type SignInInput struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

func SignIn(ctx *gin.Context) {
	var input SignInInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		handleError(ctx, 400, errors.New("Invalid input"))
		return
	}

	repository := repositories.NewUserRepository(DB(ctx))
	usecase := usecases.NewSignInUsecase(repository)
	result, err := usecase.Execute(input.Username, input.Password)
	if err != nil {
		handleError(ctx, 500, err)
	} else if result == nil {
		handleError(ctx, 404, errors.New("Fail to signin"))
	} else {
		ctx.SetCookie("jwt", result.Token, 0, "/", "", false, true)
		ctx.JSON(200, result.User)
	}
}

func SignOut(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", -1, "/", "", false, true)
	ctx.Status(204)
}

func GetSessionUser(ctx *gin.Context) {
	user := User(ctx)
	ctx.JSON(200, user)
}
