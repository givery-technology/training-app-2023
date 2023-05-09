package external

import (
	"fmt"
	"myapp/internal/config"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Database Setup
// !!! You have to call this function after config setup
func SetupDB() {
	host := config.DBHostName
	port := config.DBPort
	dbname := config.DBName
	username := config.DBUserName
	if config.DBPassword != "" {
		username += ":" + config.DBPassword
	}
	dsn := fmt.Sprintf("%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, host, port, dbname)
	fmt.Println("Password: " + config.DBPassword)
	fmt.Println(dsn)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	DB = db.Debug()
}
