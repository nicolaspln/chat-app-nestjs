import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
@ObjectType({ isAbstract: true })
export class AbstractEntity {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date, { description: 'Created At', nullable: true })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date, { description: 'Updated At', nullable: true })
  updatedAt?: Date;
}
