package repositories

import (
	"gorm.io/gorm"
	"myapp/internal/entities"
)

func applyLimitOffset(lo *entities.LimitOffset, query *gorm.DB) *gorm.DB {
	result := query
	if lo.Limit != nil && *lo.Limit > 0 {
		result = result.Limit(*lo.Limit)
		// MySQL doesn't allow OFFSET without LIMIT
		if lo.Offset != nil && *lo.Offset > 0 {
			result = result.Offset(*lo.Offset)
		}
	}
	return result
}
