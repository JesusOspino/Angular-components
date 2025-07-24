import { Component, inject } from '@angular/core';
import { Editor1Component } from './editor-1/editor-1.component';
import { ConfigPageService } from 'src/app/common/services/config-page.service';

@Component({
  selector: 'app-editors',
  imports: [Editor1Component],
  templateUrl: './editors.component.html',
  styleUrl: './editors.component.scss',
})
export class EditorsComponent {
  private readonly configPageService = inject(ConfigPageService);

  ngOnInit(): void {
    this.configPage();
  }

  configPage() {
    this.configPageService.setTitle('Editores');
    this.configPageService.setDescription(
      'Componente editor para texto enriquesido y subida de imagen a servidor'
    );
    this.configPageService.setBreadcrumbItems([
      { label: 'Components' },
      { label: 'Editores' },
    ]);
  }
}
