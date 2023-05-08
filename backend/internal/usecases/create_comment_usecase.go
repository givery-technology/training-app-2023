package usecases

import (
	"errors"
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type CreateCommentUsecase struct {
	postRepository    interfaces.PostRepository
	commentRepository interfaces.CommentRepository
}

func NewCreateCommentUsecase(
	postRepository interfaces.PostRepository,
	commentRepository interfaces.CommentRepository,
) *CreateCommentUsecase {
	return &CreateCommentUsecase{
		postRepository:    postRepository,
		commentRepository: commentRepository,
	}
}

func (u *CreateCommentUsecase) Execute(input *entities.CommentCreateInput) (*entities.Comment, error) {
	post, err := u.postRepository.Get(input.PostId, false)
	if err != nil {
		return nil, err
	}
	if post == nil {
		return nil, errors.New("Target post is not found")
	}
	return u.commentRepository.Create(input)
}
