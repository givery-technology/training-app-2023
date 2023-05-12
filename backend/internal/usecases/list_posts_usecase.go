package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type PostList struct {
	List  []*entities.Post `json:"list"`
	Count int              `json:"count"`
}

type ListPostsInput struct {
	Words  *[]string
	Offset *int
	Limit  *int
}

type ListPostsUsecase struct {
	repository interfaces.PostRepository
}

func NewListPostsUsecase(r interfaces.PostRepository) *ListPostsUsecase {
	return &ListPostsUsecase{
		repository: r,
	}
}

func (u *ListPostsUsecase) Execute(input ListPostsInput) (*PostList, error) {
	cond := interfaces.PostSearchCondition{
		Words: input.Words,
	}
	lo := entities.LimitOffset{
		Limit:  input.Limit,
		Offset: input.Offset,
	}
	list, err := u.repository.List(&cond, &lo)
	if err != nil {
		return nil, err
	}
	count, err := u.repository.Count(&cond)
	if err != nil {
		return nil, err
	}
	return &PostList{
		List:  list,
		Count: count,
	}, nil
}
