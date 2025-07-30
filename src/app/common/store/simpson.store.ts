import { computed, inject, Injectable } from '@angular/core';
import { Parameter } from '@interfaces/parameter.interface';
import { Simpson, SimpsonRequest } from '@interfaces/simpson.interface';
import { patchState, signalState } from '@ngrx/signals';
import { CustomMessageService } from '@services/custom-message.service';
import { SimpsonService } from '@services/http-services/simpson.service';
import { firstValueFrom } from 'rxjs';

type SimpsonState = {
  simpsons: Simpson[];
  isLoading: boolean;
  parameters?: Parameter;
  simpsonRequest?: SimpsonRequest;
};

const initialState: SimpsonState = {
  simpsons: [],
  isLoading: false,
  parameters: { pageNumber: 0, pageSize: 10, searchTerm: null },
  simpsonRequest: null,
};

@Injectable({
  providedIn: 'root',
})
export class SimpsonStore {
  private readonly simpsonService = inject(SimpsonService);
  private readonly message = inject(CustomMessageService);

  // Estado
  private readonly state = signalState(initialState);

  // Variables - Variables Computadas
  simpsons = computed(() => this.state.simpsons());
  isLoading = computed(() => this.state.isLoading());
  parameters = computed(() => this.state.parameters());
  simpsonRequest = computed(() => this.state.simpsonRequest());

  // Metodos o funciones
  async getAll(): Promise<Simpson[]> {
    try {
      patchState(this.state, { isLoading: true, simpsons: [] });
      const response = await firstValueFrom(
        this.simpsonService.getSimpsons(this.parameters())
      );

      if (response) {
        patchState(this.state, {
          simpsons: response.docs,
          simpsonRequest: response,
        });
      } else {
        this.message.error('Error al obtener los simpsons');
      }

      return response.docs;
    } catch (error) {
      this.message.error('Error al obtener los simpsons');
      return [];
    } finally {
      patchState(this.state, { isLoading: false });
    }
  }

  async getById(id: number): Promise<Simpson> {
    try {
      const response: any = await firstValueFrom(
        this.simpsonService.getSimpsonById(id)
      );
      return response;
    } catch (error) {
      this.message.error('Error al obtener el tenant');
      return null;
    }
  }

  async setPageNumber(pageNumber: number = 0): Promise<void> {
    patchState(this.state, {
      parameters: { ...this.parameters(), pageNumber },
    });
    await this.getAll();
  }

  async setPageSize(pageSize: number = 10) {
    patchState(this.state, {
      parameters: { ...this.parameters(), pageSize },
    });
    await this.getAll();
  }
}
