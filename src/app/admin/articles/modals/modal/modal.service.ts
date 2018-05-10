import {ComponentFactoryResolver, Inject, Injectable, ViewContainerRef} from "@angular/core";
import {MakeIssueCurrentComponent} from "../make-issue-current/make-issue-current.component";
import {ICustomModal} from "./modal.base";

@Injectable()
export class ModalService {
    factoryResolver: ComponentFactoryResolver;
    rootViewContainer: ViewContainerRef;

    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
        this.factoryResolver = factoryResolver
    }

    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
    }

    addDynamicComponent(componentToCreate) {
        const factory = this.factoryResolver
            .resolveComponentFactory(componentToCreate);
        const component = factory
            .create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);
        return component.instance;
    }
}