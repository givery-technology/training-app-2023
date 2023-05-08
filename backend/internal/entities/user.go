package entities

import (
	"time"
)

type UserId uint

type User struct {
	Id   UserId `json:"id"`
	Name string `json:"name"`
	// Password  string     `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
