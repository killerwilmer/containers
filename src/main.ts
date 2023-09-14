import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const options = new DocumentBuilder()
		.setTitle('Kiki Latam API')
		.setDescription('API for managing container')
		.setVersion('1.0')
		.addTag('containers')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('swagger', app, document);

	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();
