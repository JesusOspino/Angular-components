import { inject, Injectable, Signal, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfigPageService {
  private readonly titleService: Title = inject(Title);
  private readonly metaService: Meta = inject(Meta);

  private _title = signal<string>('');
  private _description = signal<string>('');
  private _breadcrumbItems = signal<MenuItem[]>([]);
  private _keywords = signal<string>('');
  private _author = signal<string>('');
  private _imageUrl = signal<string>('');

  public setTitle(title: string) {
    this._title.set(title);
    this.titleService.setTitle(`${title} | Lancelot`);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
  }

  public setDescription(description: string) {
    this._description.set(description);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });
  }

  public setBreadcrumbItems(items: MenuItem[]) {
    this._breadcrumbItems.set(items);
  }

  public setKeywords(keywords: string) {
    this._keywords.set(keywords);
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  public setAuthor(author: string) {
    this._author.set(author);
    this.metaService.updateTag({ name: 'author', content: author });
  }

  public setImageUrl(url: string) {
    this._imageUrl.set(url);
    this.metaService.updateTag({ property: 'og:image', content: url });
    this.metaService.updateTag({ name: 'twitter:image', content: url });
  }

  // Métodos para obtener los valores actuales
  public get title(): Signal<string> {
    return this._title.asReadonly();
  }

  public get description(): Signal<string> {
    return this._description.asReadonly();
  }

  public get breadcrumbItems(): Signal<MenuItem[]> {
    return this._breadcrumbItems.asReadonly();
  }
}
