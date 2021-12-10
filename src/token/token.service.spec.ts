import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, PrismaService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a token', async function () {
    const tokenCreated = await service.createRefreshToken('this is my token');
    expect(tokenCreated.token).toBe('this is my token');
  });
  it('should give list of token superior to 0', async function () {
    const listOfTokens = await service.findAllTokens();
    expect(listOfTokens.length).toBeGreaterThan(0);
  });
  it('should return one specific token', async function () {
    const currentToken = await service.findOneTOkenByToken('this is my token');
    expect(currentToken.token).toBeDefined();
    expect(currentToken.token).toBe('this is my token');
  });
});
