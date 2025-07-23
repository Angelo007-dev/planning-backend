import { Controller, Get, Post, Body, Patch, Param, Query, Req } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) { }

  @Post()
  create(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }

  /*@Get()
  findAll() {
    return this.planningService.findAll();
  }
  
  /*@Get('/:id')
  findOne(@Param('id') id: string) {
    return this.planningService.findOne(+id);
  }
  
  @Patch('show/:id')
  update(@Param('id') id: string, @Body() updatePlanningDto: UpdatePlanningDto) {
    return this.planningService.update(+id, updatePlanningDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planningService.remove(+id);
  }*/

  //get all planning not allocated
  @Get('/listNotAllocated')
  getAllPlanningNotAllocated(@Query() query: QueryParamsDto, @Req() req: Request) {
    return this.planningService.findAllPanningNotAllocated(query, req);
  }

  //get all planning allocated
  @Get('/listAllocated')
  getAllPlanningAllocated(@Query() query: QueryParamsDto, @Req() req: Request) {
    return this.planningService.findAllPanningAllocated(query, req);
  }

  @Patch('/:id/updateFactories')
  updateFactories(
    @Param('id') id: number,
    @Body() body: { factory1: string | null, factory2: string | null }
  ) {
    return this.planningService.updateFactories(id, body.factory1, body.factory2);
  }
}
