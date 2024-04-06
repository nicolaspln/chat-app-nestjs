import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

const toLowerCase = (v: string) => v.toLowerCase(); // to be tested once we implement logout

@Schema({ versionKey: false })
@ObjectType()
export class User extends AbstractEntity {
  @Prop({ set: toLowerCase })
  @Field()
  email: string;

  @Prop()
  @Field()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
