package org.rlpr.logipack;

import org.rlpr.logipack.config.RsaKeyProperties;
// import org.rlpr.logipack.config.PostgresConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class LogipackApplication {

	public static void main(String[] args) {
		//PostgresConfig.initializeDatabase();
		SpringApplication.run(LogipackApplication.class, args);
	}
}
