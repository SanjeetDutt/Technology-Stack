import React, { type ComponentType } from 'react';

export { Outlet } from 'react-router-dom';

/**
 * SANJEET UI > ROUTER
 * About
 *
 * Features
 * 1. Deep nested routing with props drilling
 * 2. Error handling
 * 3. Lazy loading
 * 4. Navigation guard
 * 5. Call API before mounting component
 */

export namespace Router {
	// Basic Definition
	type Name = string | 'index';
	type ComponentProps = {
		[key: string]: any;
	};
	type Component<T = ComponentProps> = Promise<{ default: ComponentType<T> }>;

	// Nested Routing
	interface NestedRouter {
		children?: Router.Object[];
	}

	// Error Boundary
	interface ErrorBoundary<CP = ComponentProps> {
		errorBoundary?: (p: CP) => React.ReactNode;
	}

	// Lazy loading
	interface LazyLoading<CP = ComponentProps> {
		loadingScreen?: (p: CP) => React.ReactNode;
	}

	// Navigation Guard
	type RouterProviders = {
		router?: any;
		store?: any;
	};
	export type NavigationGuardFunction = (props: RouterProviders) => boolean | string;
	interface NavigationGuard {
		guard?: NavigationGuardFunction;
	}

	// Before Mount
	export type BeforeMountFunction = <R = any>(props: RouterProviders) => Promise<R> | R;
	interface BeforeMount {
		beforeMount?: BeforeMountFunction;
	}

	// Final Definitions
	export interface Object<CP = ComponentProps> extends NestedRouter, ErrorBoundary<CP>, LazyLoading<CP>, NavigationGuard, BeforeMount {
		name: Name;
		component: Component<CP>;
		props?: CP;
	}
}
