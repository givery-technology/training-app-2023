package entities

import (
	"time"
)

type PostId uint

type Post struct {
	Id        PostId    `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	UserId    UserId    `json:"user_id"`
	UserName  string    `json:"user_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
