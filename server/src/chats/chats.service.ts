import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      messages: [],
    });
  }

  async findAll() {
    return this.chatsRepository.find({});
  }

  async findOne(_id: string) {
    return this.chatsRepository.findOne({ _id });
  }

  update(_id: string, updateChatInput: UpdateChatInput) {
    return `This action updates a #${_id} chat: ${JSON.stringify(updateChatInput)}`;
  }

  remove(_id: string) {
    return `This action removes a #${_id} chat`;
  }
}
