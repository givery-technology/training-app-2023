package entities

import (
	"errors"
	"time"
	"unicode/utf8"
)

type PostId uint

type Post struct {
	Id        PostId     `json:"id"`
	Title     string     `json:"title"`
	Body      string     `json:"body"`
	UserId    UserId     `json:"user_id"`
	UserName  string     `json:"username"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	Comments  []*Comment `json:"comments"`
}

type PostCreateInput struct {
	Title  string `json:"title"`
	Body   string `json:"body"`
	UserId UserId `json:"user_id"`
}

func (input PostCreateInput) Validate() error {
	return validatePostValues(input.Title, input.Body)
}

type PostUpdateInput struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

func (input PostUpdateInput) Validate() error {
	return validatePostValues(input.Title, input.Body)
}

func validatePostValues(title string, body string) error {
	len := utf8.RuneCountInString(title)
	if len == 0 {
		return errors.New("Title is required")
	} else if len > 100 {
		return errors.New("Title is too long")
	}

	len = utf8.RuneCountInString(body)
	if len == 0 {
		return errors.New("Body is required")
	}
	return nil
}
