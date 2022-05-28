import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  JSXElementConstructor,
} from 'react';

export type ValueOf<T> = T[keyof T];

// Source: https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
export type PropsOf<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<T, ComponentPropsWithoutRef<T>>;

type AsProp<T extends ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: T;
};

export type ExtendableProps<
  ExtendedProps = object,
  OverrideProps = object,
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

export type InheritableElementProps<
  T extends ElementType,
  Props = object,
> = ExtendableProps<PropsOf<T>, Props>;

export type PolymorphicComponentProps<
  T extends ElementType,
  Props = object,
> = InheritableElementProps<T, Props & AsProp<T>>;

export type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>['ref'];

export type PolymorphicComponentPropsWithRef<
  T extends ElementType,
  Props = object,
> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> };
