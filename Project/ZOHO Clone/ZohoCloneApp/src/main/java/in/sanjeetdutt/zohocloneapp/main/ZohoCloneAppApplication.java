package in.sanjeetdutt.zohocloneapp.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "in.sanjeetdutt.zohocloneapp")
@EnableJpaRepositories("in.sanjeetdutt.zohocloneapp.data.**")
@EntityScan("in.sanjeetdutt.zohocloneapp.data.**")
public class ZohoCloneAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZohoCloneAppApplication.class, args);
	}

}
