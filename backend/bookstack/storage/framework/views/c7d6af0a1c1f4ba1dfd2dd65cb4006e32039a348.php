
<?php echo e(csrf_field()); ?>

<div class="form-group title-input">
    <label for="name"><?php echo e(trans('common.name')); ?></label>
    <?php echo $__env->make('form.text', ['name' => 'name', 'autofocus' => true], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</div>

<div class="form-group description-input">
    <label for="description"><?php echo e(trans('common.description')); ?></label>
    <?php echo $__env->make('form.textarea', ['name' => 'description'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</div>

<div class="form-group" collapsible id="logo-control">
    <button type="button" class="collapse-title text-primary" collapsible-trigger aria-expanded="false">
        <label><?php echo e(trans('common.cover_image')); ?></label>
    </button>
    <div class="collapse-content" collapsible-content>
        <p class="small"><?php echo e(trans('common.cover_image_description')); ?></p>

        <?php echo $__env->make('form.image-picker', [
            'defaultImage' => url('/book_default_cover.png'),
            'currentImage' => (isset($model) && $model->cover) ? $model->getBookCover() : url('/book_default_cover.png') ,
            'name' => 'image',
            'imageClass' => 'cover'
        ], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>
</div>

<div class="form-group" collapsible id="tags-control">
    <button type="button" class="collapse-title text-primary" collapsible-trigger aria-expanded="false">
        <label for="tag-manager"><?php echo e(trans('entities.book_tags')); ?></label>
    </button>
    <div class="collapse-content" collapsible-content>
        <?php echo $__env->make('entities.tag-manager', ['entity' => $book ?? null], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>
</div>

<div class="form-group text-right">
    <a href="<?php echo e($returnLocation); ?>" class="button outline"><?php echo e(trans('common.cancel')); ?></a>
    <button type="submit" class="button"><?php echo e(trans('entities.books_save')); ?></button>
</div><?php /**PATH /var/www/bookstack/resources/views/books/parts/form.blade.php ENDPATH**/ ?>