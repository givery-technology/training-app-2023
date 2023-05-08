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

func CreatePost(ctx *gin.Context) {
	user := User(ctx)
	var input entities.PostCreateInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		handleError(ctx, 400, errors.New("Invalid input"))
		return
	}
	input.UserId = user.Id
	if err := input.Validate(); err != nil {
		handleError(ctx, 400, err)
	}
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewCreatePostUsecase(repository)
	result, err := usecase.Execute(&input)
	if err != nil {
		handleError(ctx, 400, err)
	} else {
		ctx.JSON(200, result)
	}
}

func UpdatePost(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid id: %v", idStr)))
		return
	}
	user := User(ctx)
	var input entities.PostUpdateInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		handleError(ctx, 400, errors.New("Invalid input"))
		return
	}
	if err := input.Validate(); err != nil {
		handleError(ctx, 400, err)
	}
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewUpdatePostUsecase(repository)
	result, err := usecase.Execute(user, entities.PostId(id), &input)
	if err != nil {
		handleError(ctx, 400, err)
	} else {
		ctx.JSON(200, result)
	}
}

func DeletePost(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		handleError(ctx, 400, errors.New(fmt.Sprintf("Invalid id: %v", idStr)))
		return
	}
	user := User(ctx)
	repository := repositories.NewPostRepository(DB(ctx))
	usecase := usecases.NewDeletePostUsecase(repository)
	err = usecase.Execute(user, entities.PostId(id))
	if err != nil {
		handleError(ctx, 400, err)
	} else {
		ctx.Status(204)
	}
}
