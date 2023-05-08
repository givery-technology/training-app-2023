package entities

import (
	"errors"
	"time"
	"unicode/utf8"
)

type CommentId uint

type Comment struct {
	Id        CommentId `json:"id"`
	PostId    PostId    `json:"post_id"`
	Body      string    `json:"body"`
	UserId    UserId    `json:"user_id"`
	UserName  string    `json:"username"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CommentCreateInput struct {
	PostId PostId `json:"post_id"`
	Body   string `json:"body"`
	UserId UserId `json:"user_id"`
}

func (input CommentCreateInput) Validate() error {
	return validateCommentValues(input.Body)
}

type CommentUpdateInput struct {
	Body string `json:"body"`
}

func (input CommentUpdateInput) Validate() error {
	return validateCommentValues(input.Body)
}

func validateCommentValues(body string) error {
	len := utf8.RuneCountInString(body)
	if len == 0 {
		return errors.New("Body is required")
	}
	return nil
}
