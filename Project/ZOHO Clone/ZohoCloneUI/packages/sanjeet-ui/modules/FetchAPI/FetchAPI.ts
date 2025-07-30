namespace FetchAPI {
	export type ContentType = 'JSON' | 'XML' | 'TEXT' | 'HTML' | 'FORM_DATE' | 'IMAGE' | 'AUDIO' | 'VIDEO';
	type Authorization = string;
	interface Headers {
		contentType?: ContentType;
		authorization?: Authorization;
	}
	export interface CreateProps {
		baseURL?: string;
		timeoutMS?: number;
		headers?: Headers;
	}

	export interface Configuration extends CreateProps {}

	export type DefaultResponseType = any;
}

const contentTypeMap = {
	JSON: 'application/JSON',
	XML: 'application/XML',
	TEXT: 'text/plain',
	HTML: 'text/html',
	FORM_DATE: 'multipart/form-data',
	IMAGE: 'image/*',
	AUDIO: 'audio/*',
	VIDEO: 'video/*'
};

export class FetchAPI {
	private config: FetchAPI.Configuration;

	private constructor(props: FetchAPI.CreateProps) {
		this.config = props;
	}

	static create(props: FetchAPI.CreateProps) {
		return new FetchAPI(props);
	}

	private parseURL(url: string | string[]): string {
		if (Array.isArray(url)) {
			return url.join('/');
		}
		return url;
	}

	private parseConfiguration(config?: FetchAPI.Configuration) {
		return {
			...this.config,
			...(config || {})
		};
	}

	private getContentType(contentType: FetchAPI.ContentType | undefined) {
		if (!contentType) {
			return contentTypeMap.JSON;
		}

		return contentTypeMap[contentType];
	}

	private async parseResponse(response: Response, configuration: FetchAPI.Configuration) {
		if (configuration.headers?.contentType === 'JSON') {
			return await response.json();
		}

		return response.body;
	}

	public async get<SR extends FetchAPI.DefaultResponseType, ER extends FetchAPI.DefaultResponseType>(url: string | string[], config?: FetchAPI.Configuration) {
		const parsedURL = this.parseURL(url);
		const parsedConfiguration = this.parseConfiguration(config);
		const competeURL = this.parseURL([parsedConfiguration.baseURL || '', parsedURL]);

		const response = await fetch(competeURL, {
			method: 'GET',
			headers: {
				'Content-Type': this.getContentType(parsedConfiguration.headers?.contentType)
			}
		});

		return {
			response: (await this.parseResponse(response, parsedConfiguration)) as SR,
			headers: response.headers
		};
	}
}
