import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

interface Props {
	isOpen: boolean;
	onFormBtnClick: () => void;
	onFormSubmit: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: Props) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				formRef.current &&
				!formRef.current.contains(target) &&
				props.isOpen
			) {
				props.onFormBtnClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [props.isOpen, props.onFormBtnClick]);

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		props.onFormSubmit(formState);
	};

	const handleFormReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		props.onFormSubmit(defaultArticleState);
	};

	const handleChange = <K extends keyof ArticleStateType>(
		field: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={props.onFormBtnClick} />
			<aside
				ref={formRef}
				className={clsx(
					styles.container,
					props.isOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Spacing size={50} />

					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>

					<Spacing size={50} />

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>

					<Spacing size={50} />

					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={(value) => handleChange('fontColor', value)}
					/>

					<Spacing size={50} />

					<Separator />

					<Spacing size={50} />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={(value) => handleChange('backgroundColor', value)}
					/>

					<Spacing size={50} />

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={(value) => handleChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
