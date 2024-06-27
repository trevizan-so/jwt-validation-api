import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {

    const app = await NestFactory.create(AppModule, {
        logger: ["error", "fatal", "log"],
    });

    //Configuração swagger
    const config = new DocumentBuilder()
      .setTitle("jwt-validation-api")
      .setDescription("Api para validação de token JWT perante regras negociais")
      .setVersion("1.0.1")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    //Configuração class-validator
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}
bootstrap();
