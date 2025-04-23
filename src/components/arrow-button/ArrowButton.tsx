import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface Props {
	isOpen: boolean;
	onClick: () => void;
}

export const ArrowButton = (props: Props) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={props.onClick}
			className={clsx(styles.container, props.isOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, props.isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
