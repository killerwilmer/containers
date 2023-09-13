import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('Kiki Latam API')
		.setDescription('API for managing container')
		.setVersion('1.0')
		.addTag('containers')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(3000);
}
bootstrap();
