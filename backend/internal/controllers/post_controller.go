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

func ListPosts(ctx *gin.Context) {
	words, _ := ctx.GetQueryArray("words")
	offsetStr := ctx.DefaultQuery("offset", "0")
	limitStr := ctx.DefaultQuery("limit", "0")

	input := usecases.ListPostsInput{
		Words:  &words,
		Offset: nil,
		Limit:  nil,
	}
	if offsetStr != "0" {
		n, err := strconv.Atoi(offsetStr)
		if err != nil {
			handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid offset: %v", offsetStr)))
			return
		}
		input.Offset = &n
	}
	if limitStr != "0" {
		n, err := strconv.Atoi(limitStr)
		if err != nil {
			handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid limit: %v", limitStr)))
			return
		}
		input.Limit = &n
	}
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewListPostsUsecase(repository)
	result, err := usecase.Execute(input)
	if err != nil {
		handleError(ctx, 500, err)
	} else if result != nil {
		ctx.JSON(200, result)
	}
}

func GetPost(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid id: %v", idStr)))
		return
	}
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewGetPostUsecase(repository)
	result, err := usecase.Execute(entities.PostId(id))
	if err != nil {
		handleError(ctx, 500, err)
	} else if result != nil {
		ctx.JSON(200, result)
	} else {
		handleError(ctx, 404, errors.New("Not found"))
	}
}
