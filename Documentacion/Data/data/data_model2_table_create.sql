CREATE TABLE public.hoteles (
    id varchar(5) NOT NULL,
    nombre varchar NOT NULL,
    ciudad varchar NOT NULL,
    telefono1 varchar NOT NULL,
    telefono2 varchar,
    correo varchar,
    PRIMARY KEY (id)
);


CREATE TABLE public.habitaciones (
    id SERIAL NOT NULL,
    id_hotel varchar(5) NOT NULL,
    estado varchar NOT NULL,
    tipo varchar NOT NULL,
    valor numeric(8) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.habitaciones
    (id_hotel);


CREATE TABLE public.trabajadores (
    id numeric(10) NOT NULL,
    nombre varchar NOT NULL,
    cargo varchar NOT NULL,
    telefono varchar,
    contrasenia varchar NOT NULL,
    id_hotel varchar(5) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.trabajadores
    (id_hotel);


CREATE TABLE public.clientes (
    id numeric(10) NOT NULL,
    nombre varchar NOT NULL,
    telefono varchar,
    correo varchar,
    porcentaje_descuento numeric,
    PRIMARY KEY (id)
);


CREATE TABLE public.comodidades (
    id varchar(5) NOT NULL,
    detalle varchar NOT NULL,
    valor numeric(6) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.servicios (
    id varchar(5) NOT NULL,
    id_tipo_servicio varchar NOT NULL,
    servicio varchar,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.servicios
    (id_tipo_servicio);


CREATE TABLE public.comodidad_habitacion (
    id_comodidad varchar(10) NOT NULL,
    id_habitacion integer NOT NULL,
    PRIMARY KEY (id_comodidad, id_habitacion)
);


CREATE TABLE public.tipo_servicio (
    id varchar NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.servicio_hotel (
    id SERIAL NOT NULL,
    id_hotel varchar(5) NOT NULL,
    id_servicio varchar(5) NOT NULL,
    valor numeric(8) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.servicio_hotel
    (id_hotel);
CREATE INDEX ON public.servicio_hotel
    (id_servicio);


CREATE TABLE public.reserva_habitacion (
    id_reserva integer NOT NULL,
    id_habitacion integer NOT NULL,
    valor numeric(8) NOT NULL,
    PRIMARY KEY (id_reserva, id_habitacion)
);


CREATE TABLE public.reserva_servicio (
    id_reserva integer NOT NULL,
    id_servicio_estancia integer NOT NULL,
    PRIMARY KEY (id_reserva, id_servicio_estancia)
);


CREATE TABLE public.reservas (
    id SERIAL NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    fecha_actualizacion date,
    valor_total numeric,
    valor_descuento_aplicado numeric,
    id_cliente numeric(10) NOT NULL,
    id_trabajador numeric(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.reservas
    (id_cliente);
CREATE INDEX ON public.reservas
    (id_trabajador);


CREATE TABLE public.facturas (
    id SERIAL NOT NULL,
    id_reserva integer NOT NULL,
    estado varchar NOT NULL,
    abono numeric NOT NULL,
    deuda numeric NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.facturas
    (id_reserva);


CREATE TABLE public.pagos (
    id SERIAL NOT NULL,
    id_factura integer NOT NULL,
    valor numeric NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.pagos
    (id_factura);


ALTER TABLE public.habitaciones ADD CONSTRAINT FK_habitaciones__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id);
ALTER TABLE public.trabajadores ADD CONSTRAINT FK_trabajadores__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id);
ALTER TABLE public.servicios ADD CONSTRAINT FK_servicios__id_tipo_servicio FOREIGN KEY (id_tipo_servicio) REFERENCES public.tipo_servicio(id);
ALTER TABLE public.comodidad_habitacion ADD CONSTRAINT FK_comodidad_habitacion__id_comodidad FOREIGN KEY (id_comodidad) REFERENCES public.comodidades(id);
ALTER TABLE public.comodidad_habitacion ADD CONSTRAINT FK_comodidad_habitacion__id_habitacion FOREIGN KEY (id_habitacion) REFERENCES public.habitaciones(id);
ALTER TABLE public.servicio_hotel ADD CONSTRAINT FK_servicio_hotel__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id);
ALTER TABLE public.servicio_hotel ADD CONSTRAINT FK_servicio_hotel__id_servicio FOREIGN KEY (id_servicio) REFERENCES public.servicios(id);
ALTER TABLE public.reserva_habitacion ADD CONSTRAINT FK_reserva_habitacion__id_reserva FOREIGN KEY (id_reserva) REFERENCES public.reservas(id);
ALTER TABLE public.reserva_habitacion ADD CONSTRAINT FK_reserva_habitacion__id_habitacion FOREIGN KEY (id_habitacion) REFERENCES public.habitaciones(id);
ALTER TABLE public.reserva_servicio ADD CONSTRAINT FK_reserva_servicio__id_reserva FOREIGN KEY (id_reserva) REFERENCES public.reservas(id);
ALTER TABLE public.reserva_servicio ADD CONSTRAINT FK_reserva_servicio__id_servicio_estancia FOREIGN KEY (id_servicio_estancia) REFERENCES public.servicio_hotel(id);
ALTER TABLE public.reservas ADD CONSTRAINT FK_reservas__id_cliente FOREIGN KEY (id_cliente) REFERENCES public.clientes(id);
ALTER TABLE public.reservas ADD CONSTRAINT FK_reservas__id_trabajador FOREIGN KEY (id_trabajador) REFERENCES public.trabajadores(id);
ALTER TABLE public.facturas ADD CONSTRAINT FK_facturas__id_reserva FOREIGN KEY (id_reserva) REFERENCES public.reservas(id);
ALTER TABLE public.pagos ADD CONSTRAINT FK_pagos__id_factura FOREIGN KEY (id_factura) REFERENCES public.facturas(id);