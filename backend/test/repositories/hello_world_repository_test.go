package repositories

import (
	"fmt"
	"myapp/internal/external"
	"myapp/internal/interfaces"
	"myapp/internal/repositories"
	"testing"
)

func init() {
	external.SetupDB()
}

func setupHelloWorld() (interfaces.HelloWorldRepository, func()) {
	db := external.DB.Begin()
	repo := repositories.NewHelloWorldRepository(db)
	teardown := func() {
		db.Rollback()
	}
	return repo, teardown
}

func TestHelloWorld(t *testing.T) {
	repo, teardown := setupHelloWorld()
	defer teardown()

	// Valid testcases
	testcases := []struct {
		lang    string
		message string
	}{
		{"en", "Hello World"},
		{"ja", "こんにちは 世界"},
	}
	for _, tc := range testcases {
		t.Run(fmt.Sprintf("lang = %s should returns %s", tc.lang, tc.message), func(t *testing.T) {
			result, err := repo.Get(tc.lang)
			if err != nil {
				t.Errorf("Repository returns error: %v", err.Error())
			}
			if result == nil {
				t.Error("Nil")
			} else if result.Message != tc.message {
				t.Errorf("Wrong value: %+v", result)
			}
		})
	}
	// Not found
	t.Run("lang = fr should be nil", func(t *testing.T) {
		result, err := repo.Get("fr")
		if err != nil {
			t.Errorf("Repository returns error: %v", err.Error())
		}
		if result != nil {
			t.Errorf("Not nil %+v", result)
		}
	})
}
