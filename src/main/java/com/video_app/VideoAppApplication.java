package com.video_app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.video_app.user.User;
import com.video_app.user.UserService;

@SpringBootApplication
public class VideoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideoAppApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			UserService userService) {
		return args -> {
			userService.register(
					User.builder().username("Mohammad Sadiul hakim").email("sadiulhaim@gmail.com")
							.password("hakim@123").build());

			userService.register(
					User.builder().username("Ashikur Rahman").email("ashik@gmail.com")
							.password("hakim@123").build());

			userService.register(
					User.builder().username("Rakibul Islam").email("rakib@gmail.com")
							.password("hakim@123").build());
		};
	}

}
