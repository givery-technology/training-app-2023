package controllers

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"myapp/internal/entities"
	"myapp/internal/repositories"
	"myapp/internal/usecases"
	"strconv"
)

func CreateComment(ctx *gin.Context) {
	user := User(ctx)
	var input entities.CommentCreateInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		handleError(ctx, 400, errors.New("Invalid input"))
		return
	}
	input.UserId = user.Id
	if err := input.Validate(); err != nil {
		handleError(ctx, 400, err)
	}
	db := DB(ctx)
	usecase := usecases.NewCreateCommentUsecase(
		repositories.NewPostRepository(db),
		repositories.NewCommentRepository(db),
	)
	result, err := usecase.Execute(&input)
	if err != nil {
		handleError(ctx, 400, err)
	} else {
		ctx.JSON(200, result)
	}
}

func UpdateComment(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid id: %v", idStr)))
		return
	}
	user := User(ctx)
	var input entities.CommentUpdateInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		handleError(ctx, 400, errors.New("Invalid input"))
		return
	}
	if err := input.Validate(); err != nil {
		handleError(ctx, 400, err)
	}
	repository := repositories.NewCommentRepository(DB(ctx))
	usecase := usecases.NewUpdateCommentUsecase(repository)
	result, err := usecase.Execute(user, entities.CommentId(id), &input)
	if err != nil {
		handleError(ctx, 400, err)
	} else {
		ctx.JSON(200, result)
	}
}

func DeleteComment(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid id: %v", idStr)))
		return
	}
	user := User(ctx)
	repository := repositories.NewCommentRepository(DB(ctx))
	usecase := usecases.NewDeleteCommentUsecase(repository)
	err = usecase.Execute(user, entities.CommentId(id))
	if err != nil {
		handleError(ctx, 400, err)
	} else {
		ctx.Status(204)
	}
}
